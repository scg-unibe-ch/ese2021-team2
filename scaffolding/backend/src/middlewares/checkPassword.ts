import { Request, Response } from 'express';

// Checks if password is of valid format, requirements split up for accurate messages
export function checkPassword(req: Request, res: Response, next: any) {
    try {
        const pw: string = req.body.password;
        let invalidFormat = false;
        let msg = '';
        if (pw.length < 8) {
            invalidFormat = true;
            msg = 'Password too short';
        } else if (pw.search(/\d/) === -1) {
            invalidFormat = true;
            msg = 'Password must contain number';
        } else if (pw.search('[A-Z]') === -1) {
            invalidFormat = true;
            msg = 'Password must contain capital letter';
        } else if (pw.search('[a-z]') === -1) {
            invalidFormat = true;
            msg = 'Password must contain lowercase letter';
        } else if (pw.search(/\W|_/) === -1) {                  // needs to be changed if whitespaces aren't allowed
            invalidFormat = true;
            msg = 'Password must contain a special character';
        }
        if (invalidFormat) {
            res.status(422).send({message: msg});
        } else {
            next();
        }
    } catch (err) {
        res.status(500).send({message: 'Bad Request'});
    }
}
