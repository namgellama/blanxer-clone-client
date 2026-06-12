import { Search } from "lucide-react";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";

interface Props {
    placeholder: string;
}

const SearchInput = ({ placeholder }: Props) => {
    return (
        <InputGroup className="bg-white">
            <InputGroupInput placeholder={placeholder} />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
        </InputGroup>
    );
};

export default SearchInput;
