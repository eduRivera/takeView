class Positions < ActiveRecord::Migration
  def change
  	create_table :position do |t|
			t.string :url
      t.timestamps
    end
  end
end
