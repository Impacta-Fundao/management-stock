import { getSellers, postSeller } from "@/models/seller/seller-model";
import { SellerPropsModel } from "@/models/seller/types/seller-props-model";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function useSellerModel() {
  const [seller, setSeller] = useState<Array<SellerPropsModel>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [editingId, setEditingId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<SellerPropsModel>();

  const loadSeller = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getSellers();
      setSeller(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Omit<SellerPropsModel, "id">) => {
    try {
      setLoading(true);
      setError("");
      const newSeller = await postSeller(data);
      setSeller((prev) => [...prev, newSeller]);
      reset();
      return newSeller;
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: number) => {
    const sellerToEdit = editingId
      ? seller.find((seller) => seller.id === editingId)
      : null;
    if (!sellerToEdit) {
      setError("Seller não encontrado para edição");
      return;
    }
    setEditingId(id);
    setValue("nome", sellerToEdit.nome);
    setValue("celular", sellerToEdit.celular);
    setValue("email", sellerToEdit.email);
    setValue("senha", sellerToEdit.senha);
    setValue("cnpj", sellerToEdit.cnpj);

    const handleCancelEdit = () => {
      setEditingId(null);
      reset();
    };
  };

  return {
    seller,
    loading,
    error,
    register,
    handleSubmit,
    setValue,
    reset,
    watch,

    loadSeller,
    handleCreate,
  };
}
