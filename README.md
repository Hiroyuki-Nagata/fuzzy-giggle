# Fuzzy Giggle

Excel情報をDBに入れるためのタスクを自動化する

## 設置方法など

Windowsの場合Vagrantを使うほうが早いです

## dotenv

* プロジェクト直下にdotenvファイルを置きます

```
$ rake dotenv:gen_dotenv
$ cat .env.development
# Define ENV variables for development environment
DATABASE_URL="sqlite://db/fuzzy_giggle_development.sqlite"
SERVE_STATIC_ASSETS="true"
DS_SESSIONS_SECRET="e43cb9b0c4126d1b377ed6461ba307b6d794af88b62f6135b5ad410a4cc372de"
```

### Windows

* vagrantをインストールしておいてください
    * 起動すると、`http://localhost/home/index.html` でサイトが見られるはず

```
// VMを更新してSSHでログイン
$ vagrant up
$ vagrant provision
$ vagrant ssh

// ApacheとHanamiを起動してやる
$ sudo service httpd restart
$ cd ~/fuzzy-giggle
$ bundle exec hanami s
```

### Linux/Mac

* rbenvを入れておいたほうがいいでしょう
    * 起動すると、`http://localhost:2300/home/index.html` でサイトが見られるはず

```
$ bundle install
$ bundle exec hanami s
```

Explore Hanami [guides](http://hanamirb.org/guides/), [API docs](http://docs.hanamirb.org/1.1.1/), or jump in [chat](http://chat.hanamirb.org) for help. Enjoy! 🌸
