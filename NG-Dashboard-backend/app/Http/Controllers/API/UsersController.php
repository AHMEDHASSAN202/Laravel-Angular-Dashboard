<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UsersController extends Controller
{
    use ApiResponse;

    public function profile() {
        $profile = auth()->guard('api')->user();
        return $this->apiResponse([
            'profile'   => new UserResource($profile),
            'token'     => $profile->createToken('login')->accessToken
        ], true);
    }
}
