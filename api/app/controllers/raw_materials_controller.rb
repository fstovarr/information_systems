class RawMaterialsController < ApplicationController

  def index
    raw_materials = RawMaterial.all

    render json: raw_materials, status: 200
  end

  def create
    raw_material = RawMaterial.create(raw_material_params)

    if raw_material.save
      return render json: raw_material, status: :ok
    end

    render json: 'material could not been created', status: :unprocessable_entity
  end

  def update
    raw_material = RawMaterial.find(params[:id])

    if raw_material.update_attributes(raw_material_params)
      return render json: raw_material, status: :ok
    end

    render json: 'material could not been edited', status: :unprocessable_entity
  end

  def destroy
    raw_material = RawMaterial.find(params[:id])
    if raw_material.delete
      return render json: 'material deleted', status: :ok
    end

    render json: 'material could not been deleted', status: :unprocessable_entity
  end

  def show
    raw_material = RawMaterial.find(params[:id])
    render json: raw_material, status: :ok
  end

  private

  def raw_material_params
    params.require(:raw_material).permit(:name, :quantity, :description)
  end
end
