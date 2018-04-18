# Memo

## 開発環境でのMySQL起動

* localhostでMySQLを起動する場合(Linux)

```
$ sudo systemctl start mysql
$ bundle exec rake dotenv:gen_dotenv['mysql2://localhost/fuzzy_giggle_development']
$ bundle exec hanami s
```
