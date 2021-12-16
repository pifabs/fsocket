'use-strict';

const fs = require('fs');
const path = require('path');
const bench_path = path.resolve(__dirname, '..', '..');


function get_fsocket_conf() {
	// defaults
	var conf = {
		fsocketio_port: 9002
	};

	var read_config = function (file_path) {
		const full_path = path.resolve(bench_path, file_path);

		if (fs.existsSync(full_path)) {
			var bench_config = JSON.parse(fs.readFileSync(full_path));
			for (let key in bench_config) {
				if (bench_config[key]) {
					conf[key] = bench_config[key];
				}
			}
		}
	}

	// get ports from bench/config.json
	read_config('config.json');
	read_config('sites/common_site_config.json');

	// detect current site
	if (fs.existsSync('sites/currentsite.txt')) {
		conf.default_site = fs.readFileSync('sites/currentsite.txt').toString().trim();
	}

	return conf;
}


module.exports = {
    get_fsocket_conf,
}