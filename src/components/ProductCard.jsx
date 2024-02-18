import { Link } from 'react-router-dom'

export default function ProductCard(props) {
    const { el } = props;

    return (
        <div className="">
            <div className="card-body">
                    <Link to={`/product/${el.id}`} className="text hover:text-lime-300">
                        <div className="border flex flex-col gap-2 bg-zinc-700 w-[170px]
                            h-[250px] items-center shadow shadow-red-600
                        ">
                        <div className="">
                            {
                                el.product_imgs.map((img, index) => (
                                    <img 
                                        key={index}
                                        src={img.url}
                                        alt={`Product Image ${index + 1}`}
                                        className="size w-26 h-28"
                                    />
                                ))
                            }
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text text-xl whitespace-nowrap overflow-x-hidden text-ellipsis">{el.name}</p>
                            <span className="">${el.price}</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};