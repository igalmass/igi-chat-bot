import _ from 'lodash';

class RobinEncouragementMessageCreatorService {

    public getRobinEncouragementMessage(userName?: string): string {
        let result = "";
        const random = _.random(0,100) % 2;

        switch (random) {

            case 0:
                result = `${userName}, a very good question. Did you find it by yourself?`;
                break;
            case 1:
                result = `${userName}, an excellent question!`;
                break;
            case 2:
            default:
                result = `Guys, ${userName} asked a good question. Who will be kind and help a friend?`;
                break;
        }

        return result;
    }

}

const robinEncouragementMessageCreatorService = new RobinEncouragementMessageCreatorService();

export default robinEncouragementMessageCreatorService;
