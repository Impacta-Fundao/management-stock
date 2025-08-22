"use client";
import SellerView from "./view";
import useSellerModel from "./viewModel";

export default function SellerPage() {
  const {
    editingId,
    error,
    errors,
    handleCancelEdit,
    handleCreate,
    handleDelete,
    handleEdit,
    handlePatchSeler,
    handleSubmit,
    handleUpdatePut,
    onSubmit,
    loadSeller,
    loading,
    register,
    reset,
    seller,
    setValue,
    toggleUpdateMode,
    updateMode,
  } = useSellerModel();

  return (
    <SellerView
      key={editingId} 
      onSubmit={onSubmit}
      editingId={editingId}
      error={error}
      errors={errors}
      handleCancelEdit={handleCancelEdit}
      handleCreate={handleCreate}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      handlePatchSeler={handlePatchSeler}
      handleSubmit={handleSubmit}
      handleUpdatePut={handleUpdatePut}
      loadSeller={loadSeller}
      loading={loading}
      register={register}
      reset={reset}
      seller={seller}
      setValue={setValue}
      toggleUpdateMode={toggleUpdateMode}
      updateMode={updateMode}
    />
  );
}
