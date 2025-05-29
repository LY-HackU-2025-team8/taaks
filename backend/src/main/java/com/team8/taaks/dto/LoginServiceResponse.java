package com.team8.taaks.dto;

import com.team8.taaks.config.JwtTokenUtil.JwtToken;
import com.team8.taaks.model.TaakUser;

public record LoginServiceResponse(TaakUser user, JwtToken token) {}
