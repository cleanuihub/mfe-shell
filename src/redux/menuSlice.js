import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuList:  ['Digital', 'Market Share'],
    selectedMenu: ''
}

const MenuSlice = createSlice({
    name: 'menuData',
    initialState,
    reducers: {
        updateSelectedMenu: (state, action) => {
            console.log('arun3 menu slice update selected item ', action)
            state.selectedMenu = action.payload
        }
    }
})

export const {
    updateSelectedMenu
} = MenuSlice.actions

export default MenuSlice.reducer