# Fuzzy Giggle

Excel情報をDBに入れるためのタスクを自動化する

## 設置方法など

Windowsの場合Vagrantを使うほうが早いです

### Windows

* vagrantをインストールしておいてください

```
// VMを更新してSSHでログイン
$ vagrant up
$ vagrant ssh

// ApacheとHanamiを起動してやる
$ sudo service httpd restart
$ cd ~/fuzzy-giggle
$ bundle exec hanami s
```

### Linux/Mac

* rbenvを入れておいたほうがいいでしょう

```
$ bundle install
$ bundle exec hanami s
```

Explore Hanami [guides](http://hanamirb.org/guides/), [API docs](http://docs.hanamirb.org/1.1.1/), or jump in [chat](http://chat.hanamirb.org) for help. Enjoy! 🌸
