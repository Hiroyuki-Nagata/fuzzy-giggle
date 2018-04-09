require_relative '../../../spec_helper'

describe Ds::Controllers::Home::Index do
  let(:action) { Ds::Controllers::Home::Index.new }
  let(:params) { Hash[] }

  it 'is successful' do
    response = action.call(params)
    response[0].must_equal 200
  end
end
