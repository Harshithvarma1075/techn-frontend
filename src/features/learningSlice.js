import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(
  localStorage.getItem("learning_queue")
) || [];

const learningSlice = createSlice({
  name: "learning",
  initialState,
  reducers: {
    addToQueue: (state, action) => {
      // payload is the technology object
      const exists = state.find(tech => tech.id === action.payload.id);
      if (!exists) {
        // add with default status 'to_learn'
        state.push({ ...action.payload, status: "to_learn" });
        localStorage.setItem("learning_queue", JSON.stringify(state));
      }
    },
    removeFromQueue: (state, action) => {
      // payload is the technology id
      const updated = state.filter(tech => tech.id !== action.payload);
      localStorage.setItem("learning_queue", JSON.stringify(updated));
      return updated;
    },
    updateStatus: (state, action) => {
      // payload is { id, status }
      const tech = state.find(tech => tech.id === action.payload.id);
      if (tech) {
        tech.status = action.payload.status;
        localStorage.setItem("learning_queue", JSON.stringify(state));
      }
    }
  }
});

export const { addToQueue, removeFromQueue, updateStatus } = learningSlice.actions;

export default learningSlice.reducer;
