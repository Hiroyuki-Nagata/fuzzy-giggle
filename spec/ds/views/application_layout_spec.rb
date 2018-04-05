require "spec_helper"

describe Ds::Views::ApplicationLayout do
  let(:layout)   { Ds::Views::ApplicationLayout.new(template, {}) }
  let(:rendered) { layout.render }
  let(:template) { Hanami::View::Template.new('apps/ds/templates/application.html.erb') }

  it 'contains application name' do
    rendered.must_include('Ds')
  end
end
