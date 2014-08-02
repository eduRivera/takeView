class PositionsController < ApplicationController

	def save_img
		@position = Position.create(url: params[:suggest])
	end

end
