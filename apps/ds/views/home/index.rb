require 'slim'
require 'hanami/view'

module Ds::Views::Home
  class Index
    include Ds::View

    def script_for(bundle)
      path = Hanami.root.join('webpack-assets.json')
      file = File.read(path)
      json = JSON.parse(file)
      json[bundle]['js']
    end
  end
end
