import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

import { Grid } from 'react-loader-spinner'




const Phones = () => {
   
    const [phones, setPhones] = useState([]);
    const [loading, setLoading] = useState(true);
 

    useEffect( () => {
        // fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
        // .then(res => res.json())
        // .then(data => setPhones(data))

        axios.get('https://openapi.programming-hero.com/api/phones?search=iphone')
        .then(data => {
            const phoneData = data.data.data; 
            const phonesWithFakeData = phoneData.map(phone => {
                const obj = {
                    name : phone.phone_name,
                    price : parseInt(phone.slug.split('-')[1])
                }
                return obj;
            })
           console.log(phonesWithFakeData)
           setPhones(phonesWithFakeData);
           setLoading(false);
        });
    }, [])

  

    return (
        <div>             
            {
                loading && (<div className="flex justify-center items-center mb-8 ">
                          <Grid
                            visible={true}
                            height="80"
                            width="80"
                            color="red"
                            ariaLabel="grid-loading"
                            radius="12.5"
                            wrapperStyle={{}}
                            wrapperClass="grid-wrapper"
                            />
                </div>)

            }
            <h2 className="text-5xl mt-5">Phones : {phones.length}</h2>
            <BarChart width={600} height={300} data={phones}>
            <Bar dataKey="price" fill="#8884d8" barSize={30} />
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
            <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            </BarChart>
        </div>
    );
};

export default Phones;
