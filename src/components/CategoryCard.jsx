import { Link } from "react-router-dom";

export default function CategoryCard(props) {
    const { el } = props;

    return (
        <div className="">
            <div className="card-body">
                <div className="flex">
                    <Link to={`/category/${el.name}`} className="text text-sm size-2 hover:text-lime-300">{el.name}</Link>
                </div>
            </div>
        </div>
    );
};