import React, { PureComponent } from 'react';
import ReactPlayer from 'react-player';

import styles from '../styles/Player.module.css';

class VideoPlayer extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            startVideo: false
        }
    }

    async onStart (){
        this.setState({
            startVideo: true
        })
    }
    
    render() {
        const { data } = this.props;
        const { startVideo } = this.state;
        return (
            <>
                <ReactPlayer preload="metadata" onStart={() => this.onStart()} className={styles.container} url={data?.file} playing width='100%' height='100%' controls/>
                {!startVideo && (
                    <div className={styles.message}>
                        <p>Cargando video...</p>
                    </div>
                )}
            </>
        )
    }
}


export default VideoPlayer


