depend :remote,  :match,   "node -v", "v0.8.2"
depend :remote,  :command, "httpd"
depend :remote,  :command, "sendmail"
depend :remote,  :command, "mysql"

set :application, "studshara"	
set :repository,  "root@studshara.com:/var/www/repos/ss.git"
set :scm, :git
set :branch, :w8
set :deploy_via, :remote_cache
set :ssh_options, { 
	keys: [File.join(ENV["HOME"], ".ssh", "vps")]
}
#set :default_run_options, { pty: true }
default_run_options[:shell] = false
set :deploy_to, "/var/www/studshara"

role :web, "studshara.com"                   # Your HTTP server, Apache/etc
role :app, "studshara.com"                   # This may be the same as your `Web` server
role :db,  "studshara.com", :primary => true # This is where Rails migrations will run
role :db,  "studshara.com"

namespace :deploy do	
	task :bg do
		run "nohup /tmp/a.sh", :pty => true
		#run "/tmp/a.sh > /dev/null 2>&1 &"#, :pty => true
	end
	
	desc "Task description"
	task :set_up_permissions do
		run "chmod 777 -R #{current_release}/protected/runtime"
		run "chmod 777 -R #{current_release}/documents"
		run "chmod 777 -R #{current_release}/content"
	end

	desc "Migrate"
	task :migrate do
		run "#{current_release}/protected/yiic migrate --interactive=0"
		#deploy.apply_dump
	end

	desc "Task description"
	task :finalize_update do ; end

	desc "Minimization"
	task :minimize_front_end do
		run "cd #{deploy_to}/current && ./protected/yiic env switch --name=dev"
		run "sed -i s/\"VK_APP_ID: 2835021\"/\"VK_APP_ID: 2897406\"/ #{deploy_to}/current/public/js/application/core/config/constants.js"
		run "cd #{deploy_to}/current/public/js && node /usr/local/bin/r.js -o built.js include=requireLib"
		run "cd #{deploy_to}/current && ./protected/yiic env switch --name=production"
	end
	
	task :create_dump do
		run_locally "mysqldump -uroot -p23 ss > /root/ss/dump/db.sql"
	end
	
	task :apply_dump, :roles => [:app] do
		run "mysql -uroot -p23 ss < #{deploy_to}/current/dump/db.sql"
	end
end

after "deploy:finalize_update", "deploy:set_up_permissions"
after "deploy:create_symlink", "deploy:migrate"
after "deploy:migrate", "deploy:minimize_front_end"
