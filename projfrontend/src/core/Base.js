import React from 'react'
import '../styles.css'
import Menu from './Menu';

const Base = ({
    title="My Title",
    description= "My description",
    className="text-white p-4",
    children
}) => (
    <div>
    <Menu/>
        <div className='container-fluid'>
            <div className='jumbotron text-white text-center'>
                <h3 className='display-4 my-3'>{title}</h3>
                <p className='lead'>{description}</p>
            </div>
           <div className={className}>
                {children}
           </div>
        </div>
        <footer className='footer mt-auto pt-5'>
            <div className='container-fluid bg-success text-white text-center'>
                <h4>If you got any questions, feel free to reach out!</h4>
                <button className='btn btn-warning btn-md rounded-1'>Contact Us</button>
            </div>
            <div className='container text-end'>
                <span className='text-muted'>
                    An amazing <span className='text-white'>MERN</span> Bootcamp
                </span>
            </div>
        </footer>
    </div>
)

export default Base;