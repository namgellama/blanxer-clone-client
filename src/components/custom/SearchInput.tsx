import { Search } from "lucide-react";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";

interface Props {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

const SearchInput = ({ placeholder, value, onChange }: Props) => {
    return (
        <InputGroup className="bg-white">
            <InputGroupInput
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
        </InputGroup>
    );
};

export default SearchInput;
