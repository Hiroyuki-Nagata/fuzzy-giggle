# Memo

## Vagrant初回起動

```
$ vagrant plugin install vagrant-vbguest # /home/vagrant/ 以下にマウントするため
$ vagrant up				 # ローカルにBoxを作成
$ vagrant reload			 # １度目ではマウントがうまくいかないので再度実行
$ vagrant provision			 # パッケージ更新
```

## 開発環境でのMySQL起動

* localhostでMySQLを起動する場合(Linux)

```
$ sudo systemctl start mysql
$ bundle exec rake dotenv:gen_dotenv['mysql2://localhost/fuzzy_giggle_development']
$ bundle exec hanami s
```
