import { Card, Col } from "antd"

const TotalCard = ({title, value, color}) => {
    return (
        <Col span={12}>
            <Card
            className="total-card"
            title={title}
            bordered={true}
            >
                <div className="total-card-div" style={{color: color}}>
                {value}
                </div>
            </Card>
        </Col>
    )
}

export default TotalCard;