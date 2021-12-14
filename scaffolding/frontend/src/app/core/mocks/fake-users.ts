import { User } from "src/app/models/user.model"

export const fakeUsers: any = {
    fillAllParameters: new User(
        "maxM",
        "maxMuster69!",
        "Max",
        "Mustermann",
        "maxmustermann@gmail.com",
        "Musterstrasse",
        6,
        "4200",
        "Musterdorf",
        "20.04.1969",
        "123 456 78 90",
        "",
        999
    ),
    fillOnlyNeededParameters: new User(
        "FreddyB",
        "Müesli123*",
        "Fred",
        "Bircher",
        "fredbircher@gmail.com"
    ),
    fillNoParameters: {}
}
