import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dashboardRef: null,
    projectsRef: null,
    contactRef: null,
}

const pagesSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        setDashboardRef: (state, { payload: ref }) => {
            state.dashboardRef = ref;
        },
        setProjectsRef: (state, { payload: ref }) => {
            state.projectsRef = ref;
        },
        setContactRef: (state, { payload: ref }) => {
            state.contactRef = ref;
        }
    }
})

export const pagesActions = pagesSlice.actions;
export default pagesSlice.reducer;