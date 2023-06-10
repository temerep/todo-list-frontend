import React, { Component } from "react";
import AuthService from "../services/AuthenticationService";
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination, Navigation } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  render() {
    const { currentUser} = this.state;

    return (
      <>
      <div className="main-img">
        <div className="dark-back">
          <h3 className="home-title">Welcome to ''YOUR ORGANIZER''</h3>
          <p>Here you can create/read/update/delete your todos!</p>
          <p>This organizer is created by Svitlana Vorobets</p>
          {currentUser ? (
            <Link to={"/user"} className="btn btn-dark btn-block btn-home">
              Lets start!
            </Link>
          ) : (
            <Link to={"/login"} className="btn btn-dark btn-block btn-home">
            Lets start!
          </Link>
          )}
        </div>
      </div>
      <div className="container">
        <div className="mob-d-flex m-lg-5 m-3">
          <div className="description-text">
            <h3>Why do you need this organizer?</h3>
            <p>The pace of modern life is much faster, and the web system just helps to optimize the distribution of time and tasks and facilitate control over a large amount of information.</p>
          </div>
          <img src={require('../assets/dev-life.jpg')} ></img>
        </div>
        <div className="mob-d-flex m-lg-5 m-3 flex-mod-column-reverse">
          <img src={require('../assets/papers.jpg')} ></img>
          <div className="description-text">
            <h3>Time management is important</h3>
            <p>One of the main problems of people is the distribution of working time. After all, there are not so many tasks, and the deadline is still so far. Without time management, this can be a serious obstacle to professional development. Therefore, we recommend that you read this planner and start organizing your time properly.</p>
          </div>
        </div>
      </div>
      <div className="second-img">
          <div className="dark-back">
            <p className="text-second-img">Task scheduler allows you to properly distribute working hours, and always keep work and personal meetings and purchases under control. Modern planners include several important options, and will allow you to feel like Julius Caesar, who managed to perform three actions simultaneously.</p>
            {currentUser ? (
            <Link to={"/user"} className="btn btn-dark btn-block btn-home">
              Lets start!
            </Link>
            ) : (
            <Link to={"/login"} className="btn btn-dark btn-block btn-home">
              Lets start!
            </Link>
            )}
          </div>
      </div>
      <div className="container">
        <h3 className="mb-5">What does ''YOUR ORGANIZER'' offer?</h3>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            600: {
              slidesPerView: 1,
            },
            900: {
              slidesPerView: 3,
            },
          }}
        >
          <SwiperSlide className="SwiperSlide">
            <h5>1. Create/read/update/delete todos and marking them completed</h5>
          </SwiperSlide>
          <SwiperSlide className="SwiperSlide">
            <h5>2. Classify tasks into categories that you can add or remove</h5>
          </SwiperSlide>
          <SwiperSlide className="SwiperSlide">
            <h5>3. Display today's tasks</h5>
          </SwiperSlide>
          <SwiperSlide className="SwiperSlide">
            <h5>4. Separation of the role of administrator and regular user</h5>
          </SwiperSlide>
          <SwiperSlide className="SwiperSlide">
            <h5>5. Make categories public or private to the administrator</h5>
          </SwiperSlide>
          <SwiperSlide className="SwiperSlide">
            <h5>6. Filter the list of tasks by categories</h5>
          </SwiperSlide>
        </Swiper>
        <h3 className="mb-5 mt-5">The most popular question</h3>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Is this web system completely free or I need to pay?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, this web system is completely free.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Does this web system contain administrator and regular user modes?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes! This system offers administrator and regular user modes. In addition, the average user can hide some categories from the administrator, ie make them private.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Do you have any contacts I can contact if needed?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, this data can be found in the footer. Phone: 1234 567 890. Email: svitlana.vorobets.knm.2020@lpnu.ua
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography>Is it possible to change topics in categories?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Unfortunately, not yet. However, this will be implemented in the near future.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <footer>
        <div className="container mob-d-flex align-items-center justify-content-between">
          <div className="text-left">
            <p>2022©All right reserved</p>
            <p>Made by Svitlana Vorobets</p>
          </div>
          <div className="text-right">
            <p>Phone: 1234 567 890</p>
            <p>Email: svitlana.vorobets.knm.2020@lpnu.ua</p>
          </div>
        </div>
      </footer>
     </>
    );
  }
}