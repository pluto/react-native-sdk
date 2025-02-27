require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-pluto-sdk"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.license      = package["license"]

  s.authors      = { "Pluto" => "dev@pluto.xyz" }
  s.homepage     = "https://github.com/plutoxyz/react-native-sdk"
  s.platforms    = { :ios => "12.0" }

  s.source       = { :git => "https://github.com/plutoxyz/react-native-sdk.git", :tag => "v#{s.version}" }
  s.source_files = "ios/**/*.{h,m,mm,swift}"

  s.dependency "React-Core"
  s.dependency "PlutoSwiftSDK"
end
