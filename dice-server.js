// httpモジュールを読み込む
const http = require('http')
const ctype = { 'Content-Type': 'text/html;charset=utf-8' }

// Webサーバーを実行
const svr = http.createServer(handler)
svr.listen(8081)

// サーバーにアクセスがあった時の処理
function handler (req, res) {
  // URLの判断
  const url = req.url
  // トップページか判定
  if (url === '/' || url === '/index.html') {
    showIndexPage(req, res)
    return
  }
  // サイコロページか判定
  if (url.substr(0, 6) === '/dice/') {
    showDicePage(req, res)
    return
  }
  // その他
  res.writeHead(404, ctype)
  res.end('404 not found')
}

// インデックスページへのアクセス
function showIndexPage (req, res) {
  // writeHead:ステータスコード／レスポンスヘッダーをまとめて送信
  res.writeHead(200, ctype)
  // レスポンスの本体を出力
  const html = '<h1>サイコロページの案内</h1>\n' +
    '<p><a href="/dice/6">6面体サイコロ</a></p>' +
    '<p><a href="/dice/12">12面体サイコロ</a></p>'
  /// end:レスポンスの送信を終了
  res.end(html)
}

// サイコロページへのアクセス
function showDicePage (req, res) {
  // writeHead:ステータスコード／レスポンスヘッダーをまとめて送信
  res.writeHead(200, ctype)
  // 何面体のサイコロが必要？
  const a = req.url.split('/')
  const num = parseInt(a[2])
  // 乱数を生成
  const rnd = Math.floor(Math.random() * num) + 1
  // レスポンスの本体を出力
  res.end('<p style="font-size:72px;">' + rnd + '</p>')
}
