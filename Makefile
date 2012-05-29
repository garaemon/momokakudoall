all: ameblo gree stardust

ameblo: builds/downloader_ameblo_reni.js builds/downloader_ameblo_kanako.js builds/downloader_ameblo_shiori.js builds/downloader_ameblo_ayaka.js builds/downloader_ameblo_momoka.js builds/downloader_ameblo_akari.js

builds/downloader_ameblo_reni.js: downloader_ameblo.js
	mkdir -p builds
	sed 's/__AMEBLO_ACCOUNT/takagi-sd/g' $^ > $@
builds/downloader_ameblo_kanako.js: downloader_ameblo.js
	mkdir -p builds
	sed 's/__AMEBLO_ACCOUNT/momota-sd/g' $^ > $@
builds/downloader_ameblo_shiori.js: downloader_ameblo.js
	mkdir -p builds
	sed 's/__AMEBLO_ACCOUNT/tamai-sd/g' $^ > $@
builds/downloader_ameblo_ayaka.js: downloader_ameblo.js
	mkdir -p builds
	sed 's/__AMEBLO_ACCOUNT/sasaki-sd/g' $^ > $@
builds/downloader_ameblo_momoka.js: downloader_ameblo.js
	mkdir -p builds
	sed 's/__AMEBLO_ACCOUNT/ariyasu-sd/g' $^ > $@
builds/downloader_ameblo_akari.js: downloader_ameblo.js
	mkdir -p builds
	sed 's/__AMEBLO_ACCOUNT/hayami-sd/g' $^ > $@

gree: builds/downloader_gree_reni.js builds/downloader_gree_kanako.js builds/downloader_gree_shiori.js builds/downloader_gree_ayaka.js builds/downloader_gree_momoka.js builds/downloader_gree_akari.js

builds/downloader_gree_reni.js: downloader_gree.js
	mkdir -p builds
	sed 's%__GREE_LAST_LINK%http://gree.jp/takagi_reni/blog/entry/545504246%g' $^ > $@
builds/downloader_gree_kanako.js: downloader_gree.js
	mkdir -p builds
	sed 's%__GREE_LAST_LINK%http://gree.jp/momota_kanako/blog/entry/545726778%g' $^ > $@
builds/downloader_gree_shiori.js: downloader_gree.js
	mkdir -p builds
	sed 's%__GREE_LAST_LINK%http://gree.jp/tamai_siori/blog/entry/545718091%g' $^ > $@
builds/downloader_gree_ayaka.js: downloader_gree.js
	mkdir -p builds
	sed 's%__GREE_LAST_LINK%http://gree.jp/sasaki_ayaka/blog/entry/545726338%g' $^ > $@
builds/downloader_gree_momoka.js: downloader_gree.js
	mkdir -p builds
	sed 's%__GREE_LAST_LINK%http://gree.jp/ariyasu_momoka/blog/entry/545625750%g' $^ > $@
builds/downloader_gree_akari.js: downloader_gree.js
	mkdir -p builds
	sed 's%__GREE_LAST_LINK%http://gree.jp/hayami_akari/blog/entry/545700022%g' $^ > $@

stardust: builds/downloader_stardust_reni.js builds/downloader_stardust_kanako.js builds/downloader_stardust_shiori.js builds/downloader_stardust_ayaka.js builds/downloader_stardust_momoka.js builds/downloader_stardust_akari.js

builds/downloader_stardust_reni.js: downloader_stardust.js
	mkdir -p builds
	sed 's%__STARDUST_LAST_LINK%http://star-studio.jp/momoclo/index.php?ID=2708\&cID=1%g' $^ > $@
builds/downloader_stardust_kanako.js: downloader_stardust.js
	mkdir -p builds
	sed 's%__STARDUST_LAST_LINK%http://star-studio.jp/momoclo/index.php?ID=2707\&cID=2%g' $^ > $@
builds/downloader_stardust_shiori.js: downloader_stardust.js
	mkdir -p builds
	sed 's%__STARDUST_LAST_LINK%http://star-studio.jp/momoclo/index.php?ID=2706\&cID=3%g' $^ > $@
builds/downloader_stardust_ayaka.js: downloader_stardust.js
	mkdir -p builds
	sed 's%__STARDUST_LAST_LINK%http://star-studio.jp/momoclo/index.php?ID=2709\&cID=6%g' $^ > $@
builds/downloader_stardust_momoka.js: downloader_stardust.js
	mkdir -p builds
	sed 's%__STARDUST_LAST_LINK%http://star-studio.jp/momoclo/index.php?ID=2705\&cID=11%g' $^ > $@
builds/downloader_stardust_akari.js: downloader_stardust.js
	mkdir -p builds
	sed 's%__STARDUST_LAST_LINK%http://star-studio.jp/momoclo/index.php?ID=2699\&cID=5%g' $^ > $@
