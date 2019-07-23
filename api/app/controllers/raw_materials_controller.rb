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
    raw_params = raw_material_params
    p raw_params
    quantity = raw_material.quantity.to_i + raw_params[:quantity].to_i
    client = ClientsRawMaterial.create(raw_material_params_ass)
    client.save
    if raw_material.update_attributes(quantity: quantity)

      return render json: raw_material, status: :ok
    end

    render json: 'material could not been edited', status: :unprocessable_entity
  end

  def get_history
    history = Client.find_by_sql("
      SELECT clients.name AS cname, raw_materials.name, clients_raw_materials.cost, clients_raw_materials.arrived_at FROM
      clients
      INNER JOIN clients_raw_materials ON clients.id = clients_raw_materials.client_id
      INNER JOIN raw_materials ON clients_raw_materials.raw_material_id = raw_materials.id
    ")
      render json: history, status: :ok

  end

  def get_expenses
    expenses = Client.find_by_sql("
      SELECT cost, date(arrived_at) AS date
      FROM clients_raw_materials
      GROUP BY date(arrived_at);")
      render json: expenses, status: :ok

  end


  def raw_materials_discount
    raw_material = RawMaterial.find(params[:id])
    raw_params = raw_material_params
    quantity = raw_material.quantity.to_i - raw_params[:quantity].to_i
    
    if raw_material.update_attributes(quantity: quantity)

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
  def raw_material_params_ass
    params.require(:raw_material).permit(:client_id, :raw_material_id, :arrived_at, :cost)
  end
end
