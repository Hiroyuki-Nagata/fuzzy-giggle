# coding: utf-8
require 'rake'
require 'hanami/rake_tasks'
require 'rake/testtask'

Rake::TestTask.new do |t|
  t.pattern = 'spec/**/*_spec.rb'
  t.libs    << 'spec'
  t.warning = false
end

task default: :test
task spec: :test

namespace :dotenv do
  desc "ユーザ用のdotenvファイルを作成します"
  task :gen_dotenv, ['database_url'] do |task,args|
    database_url = args['database_url']
    database_url ||= "sqlite://db/fuzzy_giggle_development.sqlite3"
    # secretキーを作成する
    # http://hanamirb.org/guides/command-line/generators/#secret
    secret = (`bundle exec hanami generate secret ds`).split("\n")[1]

    File.open(".env.development", "w") do |f|
      f.puts <<-EOS
# Define ENV variables for development environment
DATABASE_URL="#{database_url}"
SERVE_STATIC_ASSETS="true"
#{secret}
      EOS
    end
  end
end
