import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import moment from 'moment'
//import 'moment/locale/zh-cn';
// import 'antd/lib/style/index.less';     //Add this code for locally example
import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT, DemoData } from '../src/index'
//import Popup from 'reactjs-popup';
import Popup from 'react-popup';
import Nav from './Nav'
import Tips from './Tips'
import ViewSrcCode from './ViewSrcCode'
import './Basiccss.css';
import withDragDropContext from './withDnDContext'
import { Modal } from "antd"
import ListButton from './ListButton'
import NavCustom from './NavCustom'
import InputColor from 'react-input-color';
import axios from 'axios';

class Basic extends Component {
    constructor(props) {
        super(props);

        //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
        let schedulerData = new SchedulerData('2017-12-18', ViewTypes.Week);
        schedulerData.localeMoment.locale('en');
        schedulerData.setResources(DemoData.resources);
        schedulerData.setEvents(DemoData.events);
        this.state = {
            viewModel: schedulerData,
            showModal: false,
            startDate: "",
            endDate: "",
            resourceName: "",
            startTime: "",
            endTime: "",
            namePro: "",
            nameDetail: "",
            id: 0,
            testresourceId: "",
            newsch: schedulerData,
            startDateNow: "",
            endDateNow: "",
            color: "",
            percent: "",
            task: [],
            person: []
        }
    }

    handleOk = (e) => {
        axios({
            method: 'POST',
            url: 'http://localhost:3000/api/task/create',
            data: {
                "resource": this.state.resourceName,
                "startdate": "2017-12-18 09:30:00",
                "enddate": "2017-12-19 23:30:00",
                "project": this.state.namePro,
                "percent": this.state.percent,
                "detail": this.state.nameDetail,
            }
        }).then(res => {
            console.log(res);
            this.setState({
                showModal: false,
            });

        }).catch(err => {
            console.log(err);
        });
    }

    // handleOk = () => {
    //     let { startDateNow, endDateNow, resourceName, namePro, nameDetail, startTime, endTime, id, testresourceId, startDate, endDate, newsch } = this.state;
    //     const str1 = startDate + ' 09:00:00';
    //     const str2 = endDate + ' 18:00:00';
    //     const newStartDate = moment(str1, 'YYYY-MM-DD HH:mm:ss');
    //     const newEndDate = moment(str2, 'YYYY-MM-DD HH:mm:ss');

    //     let newEvent = {
    //         id: id,
    //         title: namePro,
    //         start: newStartDate,
    //         end: newEndDate,
    //         resourceId: testresourceId,
    //         bgColor: 'red',
    //     }
    //     let pram = {};
    //     pram.id = this.state.id;
    //     pram.title = this.state.namePro;
    //     pram.start = this.state.startDate;
    //     console.log("data", pram);
    //newsch.addEvent(newEvent);
    //     this.setState({
    //         viewModel: newsch
    //     })
    //     this.setState({
    //         showModal: false,
    //     });
    //     console.log(namePro);
    // };

    handleCancel = e => {
        console.log(e);
        this.setState({
            showModal: false,
        });
    };

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        let { viewModel } = this.state;
        axios({
            method: 'GET',
            url: 'http://localhost:3000/api/task',
            data: null
        }).then(res => {
            this.setState({
                task: res.data,
            });
            if (this.state.task.length > 0) {
                for (let i = 0; i < this.state.task.length; i++) {
                    let newEvent = {
                        id: this.state.task[i].id,
                        title: this.state.task[i].project,
                        start: this.state.task[i].startdate,
                        end: this.state.task[i].enddate,
                        resourceId: i,
                        bgColor: 'purple'
                    }
                    console.log(newEvent);
                    viewModel.addEvent(newEvent);
                    this.setState({
                        viewModel: viewModel
                    })
                }
            }
        }).catch(err => {
            console.log(err);
        })
    }

    componentWillMount() {
        let { viewModel } = this.state;
        axios({
            method: 'GET',
            url: 'http://localhost:3000/api/resource',
            data: null
        }).then(res => {
            console.log("test",res);
            this.setState({
                person: res.data.resource,
            });
            console.log("data",this.state.person);
            if (this.state.person.length > 0) {
                for (let i = 0; i < this.state.person.length; i++) {
                    viewModel.addResource({ id: this.state.person[i]._id, name: this.state.person[i].resourceName });
                    console.log("data",viewModel.resources.length);
                    console.log("id",this.state.person[i]._id);
                    console.log("name",this.state.person[i].resourceName);
                    this.setState({
                        viewModel: viewModel
                    })
                }
            }
            console.log(this.state.viewModel);
        }).catch(err => {
            console.log(err);
        })
    }

    render() {

        const { viewModel, showModal, startDate, endDate, resourceName, startTime, endTime, namePro, nameDetail, id, testresourceId, newsch, startDateNow, endDateNow, color, percent } = this.state;
        return (
            <div >
                <NavCustom />
                {/* <Nav /> */}
                {/* <ListButton /> */}
                <div>
                    {/* <h3 style={{textAlign: 'center'}}>Basic example<ViewSrcCode srcCodeUrl="https://github.com/StephenChou1017/react-big-scheduler/blob/master/example/Basic.js" /></h3> */}
                    <Scheduler schedulerData={viewModel}
                        prevClick={this.prevClick}
                        nextClick={this.nextClick}
                        onSelectDate={this.onSelectDate}
                        onViewChange={this.onViewChange}
                        //eventItemClick={this.eventClicked}
                        viewEventClick={this.ops1}
                        viewEventText="Edit"
                        viewEvent2Text="Delete"
                        viewEvent2Click={this.ops2}
                        updateEventStart={this.updateEventStart}
                        updateEventEnd={this.updateEventEnd}
                        moveEvent={this.moveEvent}
                        newEvent={this.newEvent}
                        onScrollLeft={this.onScrollLeft}
                        onScrollRight={this.onScrollRight}
                        onScrollTop={this.onScrollTop}
                        onScrollBottom={this.onScrollBottom}
                        toggleExpandFunc={this.toggleExpandFunc}

                        popupEvent={this.popupEvent}
                    />
                </div>
                <Modal
                    title="Thông tin yêu cầu"
                    visible={showModal}

                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className="container">
                        <div className="row form-group">
                            <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                                Resource
                            </label>
                            <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-form-label" >
                                <input
                                    type="text"
                                    value={resourceName}
                                    className="newstyleFrom"
                                    name="resourceName"
                                    onChange={this.onChange}
                                >
                                </input>
                            </label>
                        </div>
                        <div className="row form-group">
                            <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                                From
                            </label>
                            <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                                <input
                                    type="text"
                                    value={startDate}
                                    className="newstyleFrom"
                                    name="startDate"
                                    onChange={this.onChange}
                                ></input>
                            </label>
                            <label className="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-form-label">
                                to
                            </label>
                            <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-form-label">
                                <input
                                    type="text"
                                    value={endDate}
                                    className="newstyleFrom"
                                    name="endDate"
                                    onChange={this.onChange}
                                ></input>
                            </label>
                        </div>
                        {/* <div className="row form-group">
                            <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                                Time per day
                            </label>
                            <label className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-form-label">
                                <input type="text" value={startTime} onChange={this.onChangeStartTime} className="newstyleTime"></input>
                            </label>
                            <label className="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-form-label">
                                to
                            </label>
                            <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-form-label">
                                <input type="text" value={endTime} onChange={this.onChangeEndTime} className="newstyleTime"></input>
                            </label>
                        </div> */}
                        <div className="row form-group">
                            <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                                Project
                            </label>
                            <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-form-label">
                                <input
                                    type="text"
                                    value={namePro}
                                    // onChange={this.onChangeNamePro}
                                    name="namePro"
                                    onChange={this.onChange}
                                ></input>
                            </label>
                        </div>
                        <div className="row form-group">
                            <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                                Percent
                            </label>
                            <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-form-label">
                                <input
                                    type="text"
                                    // onChange={this.onChangePercent}
                                    value={percent}
                                    name="percent"
                                    onChange={this.onChange}

                                ></input>
                            </label>
                        </div>
                        <div className="row form-group">
                            <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                                Detail
                            </label>
                            <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-form-label">
                                <textarea
                                    type="text"
                                    className="styleTextarea"
                                    value={nameDetail}
                                    name="nameDetail"
                                    onChange={this.onChange}
                                ></textarea>
                            </label>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
    demo = value => {
        this.setState({
            namePro: value
        });
    }

    onChangeColor = event => {
        this.setState({
            color: event.target.value
        });
    }

    onChangeStartTime = event => {
        this.setState({
            startTime: event.target.value
        });
    }

    onChangeEndTime = event => {
        this.setState({
            endTime: event.target.value
        });
    }

    onChangeNamePro = event => {
        this.setState({
            namePro: event.target.value
        });
    };

    onChangeDetail = event => {
        this.setState({
            nameDetail: event.target.value
        });
    }

    prevClick = (schedulerData) => {
        schedulerData.prev();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData) => {
        schedulerData.next();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, day) => {
        schedulerData.setDate(day);
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    eventClicked = (schedulerData, event) => {
        alert(`Su kien vua duoc nhap: {id: ${event.id}, title: ${event.title}}`);

    };

    ops1 = (schedulerData, event) => {
        //alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops2 = (schedulerData, event) => {
        //alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
        alert('Ban co muon xoa khong?');
    };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        const beginDay = start.substr(0, 10);
        const endDay = end.substr(0, 10);
        let newFreshId = 0;
        schedulerData.events.forEach((item) => {
            if (item.id >= newFreshId)
                newFreshId = item.id + 1;
        });
        console.log("ma mau", this.state.color);
        const newItem = newFreshId;
        //const newSlotId = slotId;
        console.log("check", slotId);
        this.setState({
            showModal: true,
            startDate: beginDay,
            endDate: endDay,
            startDateNow: start,
            endDateNow: end,
            startTime: "9 am",
            endTime: "6 pm",
            resourceName: slotName,
            namePro: "",
            nameDetail: "",
            id: newItem,
            testresourceId: slotId,
            newsch: schedulerData,
        });

        // if(confirm(`Do you want to create a new task? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)){

        // let newFreshId = 0;
        // schedulerData.events.forEach((item) => {
        //     if(item.id >= newFreshId)
        //         newFreshId = item.id + 1;
        // });

        // let newEvent = {
        //     id: newFreshId,
        //     title: 'New event you just created',
        //     start: start,
        //     end: end,
        //     resourceId: slotId,
        //     bgColor: 'purple'
        //     }
        //     schedulerData.addEvent(newEvent);
        //     this.setState({
        //         viewModel: schedulerData
        //     })
        // }
    }

    updateEventStart = (schedulerData, event, newStart) => {
        if (confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
            schedulerData.updateEventStart(event, newStart);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventEnd = (schedulerData, event, newEnd) => {
        if (confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
            schedulerData.updateEventEnd(event, newEnd);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        if (confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
            schedulerData.moveEvent(event, slotId, slotName, start, end);
            this.setState({
                viewModel: schedulerData
            })
        }
    }

    onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
        if (schedulerData.ViewTypes === ViewTypes.Day) {
            schedulerData.next();
            schedulerData.setEvents(DemoData.events);
            this.setState({
                viewModel: schedulerData
            });

            schedulerContent.scrollLeft = maxScrollLeft - 10;
        }
    }

    onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
        if (schedulerData.ViewTypes === ViewTypes.Day) {
            schedulerData.prev();
            schedulerData.setEvents(DemoData.events);
            this.setState({
                viewModel: schedulerData
            });

            schedulerContent.scrollLeft = 10;
        }
    }

    onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log('onScrollTop');
    }

    onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log('onScrollBottom');
    }

    toggleExpandFunc = (schedulerData, slotId) => {
        schedulerData.toggleExpandStatus(slotId);
        this.setState({
            viewModel: schedulerData
        });
    }
}

export default withDragDropContext(Basic)
