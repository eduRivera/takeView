require 'json'

class PositionsController < ApplicationController

	def save_img
		@position = Position.create(url: params[:suggest])
		render "index"
	end
	def show_imgs
		@positions = Position.all
    	respond_to do |format|

    	  format.html # show.html.erb
    	  format.json { render json: @positions }

    	 end
    end

end
