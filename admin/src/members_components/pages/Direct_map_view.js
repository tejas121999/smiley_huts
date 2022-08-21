import React from 'react'
import "../layout/css/directMapView.css"
import TopImg from "../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/Group 4773.png"
import Search from "../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/Group 4796.png"
import mapResult from "../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/mapResult.png"
import filter from "../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/Group 4789.png"
import top_bottom_arow from "../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/Group 4788.png"
import homeImg from "../layout/images/homeImg.png"
import mapImg from "../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/Group 4798.png"
import { Navigate } from 'react-router'

const Direct_map_view = () => {
    const navigate = Navigate()
    return (
        <div className='Direct_map_view'>
            <div className="card text-white">
                <img src={TopImg} className="card-img" alt="..." />
                <div className=' card-img-overlay'>
                    <p className='direct_map_title'>Find Your Perfect Home Stay</p>
                    <div className='Input_fields'>
                        <input className='form-control Ontario' placeholder='Ontario' />
                        <input className='form-control Start_Date' placeholder='Start Date' />
                        <input className='form-control End_Date' placeholder='End Date' />
                        <button className='btn btn-dark search_button'><img src={Search} /></button>
                    </div>
                </div>
            </div>
            <div className="map_card">
                <img src={mapResult} className="map_Img" />
            </div>
            <div className='map_view_search_result'>
                <div className='search_result_div'>
                    <p className='Search_result_text'>Search Result</p>
                    <div className='btn_search_btn'>
                        <button className='btn btn-dark search_result_filter_button'><img src={filter} />&nbsp;&nbsp;Filter</button>
                        &nbsp;&nbsp;&nbsp;
                        <button className='btn btn-outline-dark search_result_Near_to_me'><img src={top_bottom_arow} />&nbsp;&nbsp;Near To Me</button>
                    </div>
                </div>
                <div className='search_card'>
                    <div className='card_main'>
                        <div className='card_head'>
                            <img src={homeImg} className="card_img" />
                        </div>
                        <div className='card_title'>
                            <p className='card_title_text'>Property Type</p>
                            <p className='card_title_address'>Dummy address road , dummy road</p>
                            <p className='card_title_rating'>Ontario&nbsp;|</p>
                            <div className='card_title_rating_star'>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "gray" }}></i>
                            </div>
                            <button className='btn btn-dark see_details_btn' onClick={()=>{navigate('/homeStayDetail')}}>See Details</button>
                            <img src={mapImg} className="see_details_map_img" />
                        </div>
                    </div>
                    <div className='card_main'>
                        <div className='card_head'>
                            <img src={homeImg} className="card_img" />
                        </div>
                        <div className='card_title'>
                            <p className='card_title_text'>Property Type</p>
                            <p className='card_title_address'>Dummy address road , dummy road</p>
                            <p className='card_title_rating'>Ontario&nbsp;|</p>
                            <div className='card_title_rating_star'>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "gray" }}></i>
                            </div>
                            <button className='btn btn-dark see_details_btn' onClick={()=>{navigate('/homeStayDetail')}}>See Details</button>
                            <img src={mapImg} className="see_details_map_img" />
                        </div>
                    </div>
                    <div className='card_main'>
                        <div className='card_head'>
                            <img src={homeImg} className="card_img" />
                        </div>
                        <div className='card_title'>
                            <p className='card_title_text'>Property Type</p>
                            <p className='card_title_address'>Dummy address road , dummy road</p>
                            <p className='card_title_rating'>Ontario&nbsp;|</p>
                            <div className='card_title_rating_star'>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "gray" }}></i>
                            </div>
                            <button className='btn btn-dark see_details_btn' onClick={()=>{navigate('/homeStayDetail')}}>See Details</button>
                            <img src={mapImg} className="see_details_map_img" />
                        </div>
                    </div>
                    <div className='card_main'>
                        <div className='card_head'>
                            <img src={homeImg} className="card_img" />
                        </div>
                        <div className='card_title'>
                            <p className='card_title_text'>Property Type</p>
                            <p className='card_title_address'>Dummy address road , dummy road</p>
                            <p className='card_title_rating'>Ontario&nbsp;|</p>
                            <div className='card_title_rating_star'>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "gray" }}></i>
                            </div>
                            <button className='btn btn-dark see_details_btn' onClick={()=>{navigate('/homeStayDetail')}}>See Details</button>
                            <img src={mapImg} className="see_details_map_img" />
                        </div>
                    </div>
                    <div className='card_main'>
                        <div className='card_head'>
                            <img src={homeImg} className="card_img" />
                        </div>
                        <div className='card_title'>
                            <p className='card_title_text'>Property Type</p>
                            <p className='card_title_address'>Dummy address road , dummy road</p>
                            <p className='card_title_rating'>Ontario&nbsp;|</p>
                            <div className='card_title_rating_star'>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "gray" }}></i>
                            </div>
                            <button className='btn btn-dark see_details_btn' onClick={()=>{navigate('/homeStayDetail')}}>See Details</button>
                            <img src={mapImg} className="see_details_map_img" />
                        </div>
                    </div>
                    <div className='card_main'>
                        <div className='card_head'>
                            <img src={homeImg} className="card_img" />
                        </div>
                        <div className='card_title'>
                            <p className='card_title_text'>Property Type</p>
                            <p className='card_title_address'>Dummy address road , dummy road</p>
                            <p className='card_title_rating'>Ontario&nbsp;|</p>
                            <div className='card_title_rating_star'>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "gray" }}></i>
                            </div>
                            <button className='btn btn-dark see_details_btn' onClick={()=>{navigate('/homeStayDetail')}}>See Details</button>
                            <img src={mapImg} className="see_details_map_img" />
                        </div>
                    </div>
                    <div className='card_main'>
                        <div className='card_head'>
                            <img src={homeImg} className="card_img" />
                        </div>
                        <div className='card_title'>
                            <p className='card_title_text'>Property Type</p>
                            <p className='card_title_address'>Dummy address road , dummy road</p>
                            <p className='card_title_rating'>Ontario&nbsp;|</p>
                            <div className='card_title_rating_star'>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "gray" }}></i>
                            </div>
                            <button className='btn btn-dark see_details_btn' onClick={()=>{navigate('/homeStayDetail')}}>See Details</button>
                            <img src={mapImg} className="see_details_map_img" />
                        </div>
                    </div><div className='card_main'>
                        <div className='card_head'>
                            <img src={homeImg} className="card_img" />
                        </div>
                        <div className='card_title'>
                            <p className='card_title_text'>Property Type</p>
                            <p className='card_title_address'>Dummy address road , dummy road</p>
                            <p className='card_title_rating'>Ontario&nbsp;|</p>
                            <div className='card_title_rating_star'>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "gray" }}></i>
                            </div>
                            <button className='btn btn-dark see_details_btn' onClick={()=>{navigate('/homeStayDetail')}}>See Details</button>
                            <img src={mapImg} className="see_details_map_img" />
                        </div>
                    </div>
                    <div className='card_main'>
                        <div className='card_head'>
                            <img src={homeImg} className="card_img" />
                        </div>
                        <div className='card_title'>
                            <p className='card_title_text'>Property Type</p>
                            <p className='card_title_address'>Dummy address road , dummy road</p>
                            <p className='card_title_rating'>Ontario&nbsp;|</p>
                            <div className='card_title_rating_star'>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "yellow" }}></i>
                                <i className="fas fa-star" style={{ color: "gray" }}></i>
                            </div>
                            <button className='btn btn-dark see_details_btn' onClick={()=>{navigate('/homeStayDetail')}}>See Details</button>
                            <img src={mapImg} className="see_details_map_img" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='you_may_also_want_see'>
                <p className='you_may_also_want_see_title'>You May Also Want See</p>
                <div className='bottom_card'>
                    <div className='bottom_card_body'>
                        <img src={homeImg} className="bottom_card_img" />
                    </div>
                    <div className='bottom_card_body'>
                        <img src={homeImg} className="bottom_card_img" />
                    </div>
                    <div className='bottom_card_body'>
                        <img src={homeImg} className="bottom_card_img" />
                    </div>
                    <div className='bottom_card_body'>
                        <img src={homeImg} className="bottom_card_img" />
                    </div>
                    <div className='bottom_card_body'>
                        <img src={homeImg} className="bottom_card_img" />
                    </div>
                    <div className='bottom_card_body'>
                        <img src={homeImg} className="bottom_card_img" />
                    </div>
                    <div className='bottom_card_body'>
                        <img src={homeImg} className="bottom_card_img" />
                    </div>
                    <div className='bottom_card_body'>
                        <img src={homeImg} className="bottom_card_img" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Direct_map_view