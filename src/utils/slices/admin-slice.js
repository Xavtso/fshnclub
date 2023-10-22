import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        candidates:[],
        users: [],
        filteringUsers: [],
        
    },
    reducers: {
        fetchCandidates(state, action) {
            state.candidates = action.payload;
        },
        filterCandidates(state,action) {
            const filteredCandidates = state.candidates.filter(
                candidate => candidate.id !== action.payload
            )
            state.candidates = filteredCandidates
        },
        
        storeUsers(state, action) {
            state.users = action.payload;
            state.filteringUsers = action.payload;
        },
        removeUser(state, action) {
            const filteredUsers = state.users.filter(user => user.id !== action.payload); 
            state.users = filteredUsers;
            state.filteringUsers = filteredUsers;
        },
        sortUsers(state, action) {
            console.log(state.users);
            if (action.payload.type === 'ascending') {
               
             const ascending = action.payload.value 
    
                if (ascending === "none") {
                    return state.users;
                }

                const sortedUsers = [...state.filteringUsers].sort((a, b) => {
                    if (!a.birthDate || !b.birthDate) return 0;
                    const aAge = calculateAge(a.birthDate);
                    const bAge = calculateAge(b.birthDate);
                    return ascending === 'asc' ? aAge - bAge : bAge - aAge;
                });
                state.users = sortedUsers;
            }
            if (action.payload.type === 'role') {
                 const role = action.payload.value;
                 const filteredUsers = state.filteringUsers.filter((user) =>
                   role === "all" ? user : user.role === role,
                 );
                 state.users = filteredUsers
            } 
            },
            searchUser(state, action) {
                const searchTerm = action.payload.toLowerCase();
                const filteredUsers = state.filteringUsers.filter(
                    (user) =>
                    user.name.toLowerCase().includes(searchTerm) ||
                  user.phoneNumber.toLowerCase().includes(searchTerm),
              );
            state.users = filteredUsers;
        }

    }
})

  function calculateAge(birthDate) {
    if (!birthDate) {
      return "?";
    }

    const birthDateObj = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      return age - 1;
    }

    return age;
  }

export const adminSliceActions = adminSlice.actions;

export default adminSlice;