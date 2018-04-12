Vagrant.configure("2") do |config|
  config.vm.box = "mvbcoding/awslinux"
  config.vm.box_version = "2017.03.0.20170401"
  config.vm.network "forwarded_port", guest: 80, host: 80
  config.vm.network "forwarded_port", guest: 3306, host: 3306

  # import settings
  settings = YAML.load_file 'vagrant-conf/config.yaml'

  # reverse proxy
  config.vm.provision "file", source: settings['app']['conf-name'], destination: "/home/vagrant/#{settings['app']['conf-name']}"
  # MySQL automation
  config.vm.provision "file", source: "vagrant-conf/secure-mysql.sh", destination: "/home/vagrant/secure-mysql.sh"
  # deploy codes
  config.vm.provision "shell", privileged: false, inline: <<-SHELL

    # Author: Bert Van Vreckem <bert.vanvreckem@gmail.com>
    # Predicate that returns exit status 0 if the database root password
    # is set, a nonzero exit status otherwise.
    is_mysql_root_password_set() {
      mysqladmin --user=root status > /dev/null 2>&1
      echo ! $?
      return
    }

    whoami      #=> vagrant
    echo $HOME  #=> /home/vagrant
    # install packages
    sudo yum -y update
    sudo yum -y install git openssl-devel readline-devel zlib-devel httpd

    # install mysql57
    sudo rpm -q mysql-community-server

    if [ $? -eq 1 ]; then
       echo "Install MySQL 5.7 !"
       sudo yum install -y http://dev.mysql.com/get/mysql57-community-release-el6-7.noarch.rpm
       sudo yum install -y mysql-community-server
       sudo service mysqld start
       sudo chkconfig mysqld on
    else
       echo "Already installed MySQL 5.7"
       sudo service mysqld restart
    fi

    if [ is_mysql_root_password_set = "0" ]; then
       echo "MySQL is already set root password"
    else
       # FYI: http://www.luft.co.jp/cgi/randam.php
       echo "Set root password for MySQL"
       bash secure-mysql.sh #{settings['db']['mysql-root-password']}
    fi

    # prepare rbenv
    if hash rbenv 2>/dev/null; then
      echo "Already rbenv is installed"
    else
      curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-installer | bash
      # exec rbenv
      if [ `grep rbenv ~/.bashrc | wc -l` -eq 1 ]; then
        echo "hello";
      else
        echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
        echo 'eval "$(rbenv init -)"'               >> ~/.bashrc
      fi
    fi
    source ~/.bashrc

    export PATH="$HOME/.rbenv/bin:$PATH"
    eval "$(rbenv init -)"

    rbenv install -s #{settings['app']['ruby-version']}
    rbenv rehash
    rbenv global #{settings['app']['ruby-version']}

    # checkout settings['app']['app-name']
    gem install bundler

    CLONE_TO=/home/vagrant/#{settings['app']['app-name']}
    REPO_URL=#{settings['app']['git-url']}
    BRANCH=#{settings['app']['branch']}

    if [ -d "$CLONE_TO" ]; then
      cd $CLONE_TO
      git fetch -p
      git checkout -q $BRANCH
      latest_rev=$(git ls-remote origin HEAD | awk '{print $1}')
      current_rev=$(git rev-parse HEAD)
      if [ "$latest_rev" != "$current_rev" ]; then
        git reset --hard $(git log --pretty=format:%H | tail -1)
        git pull
      fi
    else
      git clone $REPO_URL $CLONE_TO
    fi

    # update settings['app']['app-name'] (hanami side)
    ruby --version
    cd $CLONE_TO && bundle install

    # prepare yarn
    if hash yarn 2>/dev/null; then
      echo "Already yarn is installed"
    else
      sudo yum -y install wget
      sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
      curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
      sudo yum -y install gcc-c++ make nodejs
      sudo yum -y install yarn
      yarn --version
    fi

    # deploy time !
    sudo npm install yarn -g
    sudo npm install webpack -g
    sudo npm install webpack-cli -g
    cd $CLONE_TO && yarn

    # reverse proxy
    sudo mv -f /home/vagrant/#{settings['app']['conf-name']} /etc/httpd/conf.d/#{settings['app']['conf-name']}
    sudo yum -y install httpd
    sudo service httpd restart
    #cd $CLONE_TO && bundle exec hanami s &
SHELL
end
