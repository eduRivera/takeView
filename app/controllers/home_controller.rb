class HomeController < ApplicationController

	def index
        render "index"
    end

    def show_imgs
    	@allImages = Position.all
    end
end
