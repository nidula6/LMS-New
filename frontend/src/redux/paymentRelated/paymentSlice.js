// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     paymentList: [],
//     paymentDetails: [],
//     loading: false,
//     error: null,
//     response: null,
// };

// const paymentSlice = createSlice({
//     name: 'payment',
//     initialState,
//     reducers: {
//         getRequest: (state) => {
//             state.loading = true;
//         },
//         doneSuccess: (state, action) => {
//             state.paymentList = action.payload;
//             state.loading = false;
//             state.error = null;
//             state.response = null;
//         },
//         getSuccess: (state, action) => {
//             state.paymentList = action.payload;
//             state.loading = false;
//             state.error = null;
//             state.response = null;
//         },
//         getFailed: (state, action) => {
//             state.response = action.payload;
//             state.loading = false;
//             state.error = null;
//         },
//         getError: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         postDone: (state) => {
//             state.loading = false;
//             state.error = null;
//             state.response = null;
//         }
//     },
// });

// export const {
//     getRequest,
//     getSuccess,
//     getFailed,
//     getError,
//     doneSuccess,
//     postDone
// } = paymentSlice.actions;

// export const paymentReducer = paymentSlice.reducer;