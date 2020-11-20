import React from "react";
import "../styles/Home.css";
import Product from "./Product";

function Home() {
	return (
		<div className="home">
			<div className="home__container">
				<img
					className="home__image"
					src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
					alt=""
				/>

				<div className="home__row">
					<Product
						id="916420"
						title="The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses"
						price={29.99}
						image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
						rating={4}
					/>
					<Product
						id="38094513"
						title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and whisk, 5 litre Glass Bowl"
						price={239.0}
						image="https://cdn.productreview.com.au/resize/listing-picture/b83fafd0-e854-3d06-9775-150ed5e7327f?width=1200&height=630&withoutEnlargement=true&v=2"
						rating={5}
					/>
				</div>

				<div className="home__row">
					<Product
						id="123123"
						title="Samsung LC49RG90SSUXEN Smart Watch / Health Tracker"
						price={199.99}
						image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
						rating={3}
					/>
					<Product
						id="2344590"
						title="Amazon Echo (3rd Gen) | Smart Speaker with Alexa, Charcoal Fabric"
						price={98.99}
						image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
						rating={5}
					/>
					<Product
						id="3254325"
						title="New Apple Ipad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
						price={598.99}
						image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
						rating={4}
					/>
				</div>

				<div className="home__row">
					<Product
						id="887654"
						title="Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED Computer Monitor, 3840 x 1080p Resolution, 1ms Response, FreeSync 2 with HDR"
						price={899.99}
						image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-8hg8lx18FaXcJBmYsfRTdiyuGM46cOs5jA&usqp=CAU"
						rating={5}
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;
