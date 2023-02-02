// Code generated by @apexlang/codegen. DO NOT EDIT.

package follow

import (
	"context"
	"encoding/binary"

	"github.com/google/uuid"
	"github.com/nanobus/iota/go/invoke"
	"github.com/nanobus/iota/go/msgpack"
	"github.com/nanobus/iota/go/payload"
	"github.com/nanobus/iota/go/proxy"
	"github.com/nanobus/iota/go/rx/flux"
	"github.com/nanobus/iota/go/rx/mono"
	"github.com/nanobus/iota/go/transform"
)

var (
	gCaller invoke.Caller
)

func Initialize(caller invoke.Caller) {
	gCaller = caller
}

type FollowStoreImpl struct {
	opLoad           uint32
	opGetMultiple    uint32
	opIsFollowing    uint32
	opFollow         uint32
	opUnfollow       uint32
	opFetchFollowers uint32
	opFetchFollows   uint32
	opMyFollows      uint32
}

func NewFollowStore() *FollowStoreImpl {
	return &FollowStoreImpl{
		opLoad:           invoke.ImportRequestResponse("nanochat.io.follows.v1.FollowStore", "load"),
		opGetMultiple:    invoke.ImportRequestStream("nanochat.io.follows.v1.FollowStore", "getMultiple"),
		opIsFollowing:    invoke.ImportRequestResponse("nanochat.io.follows.v1.FollowStore", "isFollowing"),
		opFollow:         invoke.ImportRequestResponse("nanochat.io.follows.v1.FollowStore", "follow"),
		opUnfollow:       invoke.ImportRequestResponse("nanochat.io.follows.v1.FollowStore", "unfollow"),
		opFetchFollowers: invoke.ImportRequestStream("nanochat.io.follows.v1.FollowStore", "fetchFollowers"),
		opFetchFollows:   invoke.ImportRequestStream("nanochat.io.follows.v1.FollowStore", "fetchFollows"),
		opMyFollows:      invoke.ImportRequestStream("nanochat.io.follows.v1.FollowStore", "myFollows"),
	}
}

func (f *FollowStoreImpl) Load(ctx context.Context, userID uuid.UUID) mono.Mono[UserRef] {
	request := FollowStoreLoadArgs{
		UserID: userID,
	}
	payloadData, err := msgpack.ToBytes(&request)
	if err != nil {
		return mono.Error[UserRef](err)
	}
	var metadata [8]byte
	stream, ok := proxy.FromContext(ctx)
	binary.BigEndian.PutUint32(metadata[0:4], f.opLoad)
	if ok {
		binary.BigEndian.PutUint32(metadata[4:8], stream.StreamID())
	}
	pl := payload.New(payloadData, metadata[:])
	future := gCaller.RequestResponse(ctx, pl)
	return mono.Map(future, transform.MsgPackDecode[UserRef])
}

func (f *FollowStoreImpl) GetMultiple(ctx context.Context, userIds []uuid.UUID) flux.Flux[UserRef] {
	request := FollowStoreGetMultipleArgs{
		UserIds: userIds,
	}
	payloadData, err := msgpack.ToBytes(&request)
	if err != nil {
		return flux.Error[UserRef](err)
	}
	var metadata [8]byte
	stream, ok := proxy.FromContext(ctx)
	binary.BigEndian.PutUint32(metadata[0:4], f.opGetMultiple)
	if ok {
		binary.BigEndian.PutUint32(metadata[4:8], stream.StreamID())
	}
	pl := payload.New(payloadData, metadata[:])
	future := gCaller.RequestStream(ctx, pl)
	return flux.Map(future, transform.MsgPackDecode[UserRef])
}

func (f *FollowStoreImpl) IsFollowing(ctx context.Context, userID uuid.UUID) mono.Mono[bool] {
	request := FollowStoreIsFollowingArgs{
		UserID: userID,
	}
	payloadData, err := msgpack.ToBytes(&request)
	if err != nil {
		return mono.Error[bool](err)
	}
	var metadata [8]byte
	stream, ok := proxy.FromContext(ctx)
	binary.BigEndian.PutUint32(metadata[0:4], f.opIsFollowing)
	if ok {
		binary.BigEndian.PutUint32(metadata[4:8], stream.StreamID())
	}
	pl := payload.New(payloadData, metadata[:])
	future := gCaller.RequestResponse(ctx, pl)
	return mono.Map(future, transform.Bool.Decode)
}

func (f *FollowStoreImpl) Follow(ctx context.Context, followedID uuid.UUID) mono.Void {
	request := FollowStoreFollowArgs{
		FollowedID: followedID,
	}
	payloadData, err := msgpack.ToBytes(&request)
	if err != nil {
		return mono.Error[struct{}](err)
	}
	var metadata [8]byte
	stream, ok := proxy.FromContext(ctx)
	binary.BigEndian.PutUint32(metadata[0:4], f.opFollow)
	if ok {
		binary.BigEndian.PutUint32(metadata[4:8], stream.StreamID())
	}
	pl := payload.New(payloadData, metadata[:])
	future := gCaller.RequestResponse(ctx, pl)
	return mono.Map(future, transform.Void.Decode)
}

func (f *FollowStoreImpl) Unfollow(ctx context.Context, followedID uuid.UUID) mono.Void {
	request := FollowStoreUnfollowArgs{
		FollowedID: followedID,
	}
	payloadData, err := msgpack.ToBytes(&request)
	if err != nil {
		return mono.Error[struct{}](err)
	}
	var metadata [8]byte
	stream, ok := proxy.FromContext(ctx)
	binary.BigEndian.PutUint32(metadata[0:4], f.opUnfollow)
	if ok {
		binary.BigEndian.PutUint32(metadata[4:8], stream.StreamID())
	}
	pl := payload.New(payloadData, metadata[:])
	future := gCaller.RequestResponse(ctx, pl)
	return mono.Map(future, transform.Void.Decode)
}

func (f *FollowStoreImpl) FetchFollowers(ctx context.Context, userID uuid.UUID, offset uint32, limit uint32) flux.Flux[FollowRef] {
	request := FollowStoreFetchFollowersArgs{
		UserID: userID,
		Offset: offset,
		Limit:  limit,
	}
	payloadData, err := msgpack.ToBytes(&request)
	if err != nil {
		return flux.Error[FollowRef](err)
	}
	var metadata [8]byte
	stream, ok := proxy.FromContext(ctx)
	binary.BigEndian.PutUint32(metadata[0:4], f.opFetchFollowers)
	if ok {
		binary.BigEndian.PutUint32(metadata[4:8], stream.StreamID())
	}
	pl := payload.New(payloadData, metadata[:])
	future := gCaller.RequestStream(ctx, pl)
	return flux.Map(future, transform.MsgPackDecode[FollowRef])
}

func (f *FollowStoreImpl) FetchFollows(ctx context.Context, userID uuid.UUID, offset uint32, limit uint32) flux.Flux[FollowRef] {
	request := FollowStoreFetchFollowsArgs{
		UserID: userID,
		Offset: offset,
		Limit:  limit,
	}
	payloadData, err := msgpack.ToBytes(&request)
	if err != nil {
		return flux.Error[FollowRef](err)
	}
	var metadata [8]byte
	stream, ok := proxy.FromContext(ctx)
	binary.BigEndian.PutUint32(metadata[0:4], f.opFetchFollows)
	if ok {
		binary.BigEndian.PutUint32(metadata[4:8], stream.StreamID())
	}
	pl := payload.New(payloadData, metadata[:])
	future := gCaller.RequestStream(ctx, pl)
	return flux.Map(future, transform.MsgPackDecode[FollowRef])
}

func (f *FollowStoreImpl) MyFollows(ctx context.Context) flux.Flux[FollowRef] {
	payloadData := []byte{}
	var metadata [8]byte
	stream, ok := proxy.FromContext(ctx)
	binary.BigEndian.PutUint32(metadata[0:4], f.opMyFollows)
	if ok {
		binary.BigEndian.PutUint32(metadata[4:8], stream.StreamID())
	}
	pl := payload.New(payloadData, metadata[:])
	future := gCaller.RequestStream(ctx, pl)
	return flux.Map(future, transform.MsgPackDecode[FollowRef])
}