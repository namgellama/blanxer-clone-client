import { useQueryState } from "nuqs";
import { useDebounce } from "./useDebounce";

export const useSearch = () => {
    const [search, setSearchValue] = useQueryState("search", {
        defaultValue: "",
    });
    const debouncedSearch = useDebounce<string>(search, 500);

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };

    return { search, debouncedSearch, handleSearch };
};
