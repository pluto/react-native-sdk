#import "PlutoProverBridge.h"
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PlutoProver, NSObject)

RCT_EXTERN_METHOD(generateProof:(NSDictionary *)manifest
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(generateProofFromUrl:(NSString *)url
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(showBrowserView:(NSDictionary *)manifest
                  prepareJS:(NSString *)prepareJS
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(test:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

@end
