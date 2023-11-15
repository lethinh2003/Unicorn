"use client";
import { Stack, TextField } from "@mui/material";

function PaymentNote() {
  return (
    <Stack
      spacing={2}
      sx={{
        padding: "2rem",
      }}
    >
      <h2 className="text-[2.5rem] font-bold">Ghi chú</h2>
      <TextField
        sx={{
          backgroundColor: "white",
          borderRadius: "1rem",
        }}
        id="outlined-multiline-static"
        label="Nhập ghi chú..."
        multiline
        rows={4}
      />
    </Stack>
  );
}

export default PaymentNote;
