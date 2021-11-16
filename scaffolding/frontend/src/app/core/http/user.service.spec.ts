import { HttpClient } from '@angular/common/http';
import { fakeUsers } from './../mocks/fake-users';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('UserService', () => {
    let service: UserService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });
        service = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController)
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should register a user with all parameters filled out', () => {
        service.register(fakeUsers.fillAllParameters)
            .then(res => {
                expect(res).toBeTruthy();
                expect(res).toEqual(fakeUsers.fillAllParameters)
            })
    })

    it('should delete be able to delete users', () => {
        service.delete(fakeUsers.fillAllParameters)
            .then(res => {
                expect(res).toBeTruthy();
                expect(res).toEqual(fakeUsers.fillAllParameters)
            })
    })
});
