import os
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

# .envファイルの内容を読み込みます
load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

import json                                 # 返却された検索結果の読み取りにつかう
from googleapiclient.discovery import build # APIへのアクセスにつかう

# カスタム検索エンジンID
CUSTOM_SEARCH_ENGINE_ID = (os.environ['CUSTOM_SEARCH_ENGINE_ID'])

# API キー
API_KEY = (os.environ['API_KEY']) 

# 検索する個数(クォートの制限を超えないように)
SerachNum = 1

# APIにアクセスして結果をもらってくるメソッド
def get_search_results(query):
    
    # APIでやりとりするためのリソースを構築
    # 詳細: https://googleapis.github.io/google-api-python-client/docs/epy/googleapiclient.discovery-pysrc.html#build
    search = build(
        "customsearch", 
        "v1", 
        developerKey = API_KEY
    )
    
    # Google Custom Search から結果を取得
    # 詳細: https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list
    result = search.cse().list(
        q = query,
        cx = CUSTOM_SEARCH_ENGINE_ID,
        lr = 'lang_ja',
        num = SerachNum,
        start = 1
    ).execute()

    # 受け取ったjsonをそのまま返却
    return result


# 検索結果の情報をSearchResultに格納してリストで返す
def summarize_search_results(result):

    # 結果のjsonから検索結果の部分を取り出しておく
    result_items_part = result['items']

    # 抽出した検索結果の情報はこのリストにまとめる
    result_items = []
    
    # 今回は (start =) 1 個目の結果から (num =) 10 個の結果を取得した
    for i in range(0, SerachNum):
        # i番目の検索結果の部分
        result_item = result_items_part[i]
        # i番目の検索結果からそれぞれの属性の情報をResultクラスに格納して
        # result_items リストに追加する
        result_items.append(
            SearchResult(
                title = result_item['title'],
                url = result_item['link'],
                snippet = result_item['snippet'],
                rank = i + 1
            )
        )

    # 結果を格納したリストを返却
    return result_items

       
# 検索結果の情報を格納するクラス
class SearchResult:
    def __init__(self, title, url, snippet, rank):
        self.title = title
        self.url = url
        self.snippet = snippet
        self.rank = rank

    def __str__(self):
        # コマンドライン上での表示形式はご自由にどうぞ
        return "[title] " + self.title + "\n\t[url] " + self.url + "\n\t[snippet] " + self.snippet + "\n\t[rank] " + str(self.rank)

class TestParam(BaseModel):
    keyword : str

@app.get("/")
def get_root():
    return {"message": "Search sample"}

@app.post("/")
def post_root(testParam: TestParam):
    query = testParam.keyword
    result = get_search_results(query)
    result_items_list = summarize_search_results(result)
    
    return result_items_list

# メインプロセス       
if __name__ == '__main__':

    # 検索キーワード
    query = input()

    # APIから検索結果を取得
    result = get_search_results(query) # result には 返却されたjsonが入る

    # 検索結果情報からタイトル, URL, スニペット, 検索結果の順位を抽出してまとめる
    result_items_list = summarize_search_results(result) # result_items_list には SearchResult のリストが入る

    # コマンドラインに検索結果の情報を出力
    for i in range(0, SerachNum):
        print(result_items_list[i])