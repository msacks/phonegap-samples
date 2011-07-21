help:
	@echo "Commands:"
	@echo "  android .... Build and deploy Android"
	@echo "  ios ........ Generates iOS source and opens Xcode"

# # # # # # # # # # # # #
# ANDROID
# # # # # # # # # # # # #

ANDROID     = ./target/android
ANDROID_WWW = ${ANDROID}/assets/www

android:
	if [ ! -e ${ANDROID}/local.properties ] ; then cd ${ANDROID} && android update project -p . -t 1; fi
	mkdir -p ${ANDROID}/assets
	rm -rf ${ANDROID_WWW}
	cp -R ./www ${ANDROID_WWW}
	cp ./lib/phonegap/android/phonegap.0.9.4.js ${ANDROID_WWW}/phonegap.0.9.4.js
	ant -f ${ANDROID}/build.xml debug install

# # # # # # # # # # # # #
# iOS
# # # # # # # # # # # # #

IOS     = ./target/ios/KitchenSink
IOS_WWW = ${IOS}/www

ios:
	rm -Rf ${IOS_WWW}
	cp -R ./www ${IOS_WWW}
	cp ./lib/phonegap/ios/phonegap.0.9.4.js ${IOS_WWW}/phonegap.0.9.4.js
	open ${IOS}/KitchenSink.xcodeproj

.PHONY: help
