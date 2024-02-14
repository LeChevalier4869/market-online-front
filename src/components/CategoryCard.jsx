import axios from "axios";

export default function CategoryCard(props) {
    const { el } = props;

    return (
        <div className="">
            <div className="card-body">
                <div className="flex">
                    <a href="#" className="text text-sm size-2 focus:text-lime-300">{el.name}</a>
                </div>
            </div>
        </div>
    );
};