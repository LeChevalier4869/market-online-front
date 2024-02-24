import { useContext } from "react";
import AddressContext from '../contexts/AddressContext';

export default function useAdmin() {
    return useContext(AddressContext);
};